import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { customFetch } from "./custom-fetch";
import type { ErrorType } from "./custom-fetch";

export interface ReferralTier {
  count: number;
  rewardDays: number;
  label: string;
}

export interface ReferralEntry {
  id: number;
  referredName: string | null;
  status: string;
  rewardDays: number;
  createdAt: string;
  completedAt: string | null;
}

export interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  completedReferrals: number;
  totalRewardDays: number;
  currentTier: string | null;
  nextTier: { count: number; rewardDays: number; label: string; remaining: number } | null;
  tiers: ReferralTier[];
  referrals: ReferralEntry[];
}

export const getMyReferrals = async (options?: RequestInit): Promise<ReferralStats> => {
  return customFetch<ReferralStats>(`/api/me/referrals`, {
    ...options,
    method: "GET",
  });
};

export const getMyReferralsQueryKey = () => [`/api/me/referrals`] as const;

export function useGetMyReferrals<
  TData = ReferralStats,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<ReferralStats, TError, TData>;
}) {
  const { query: queryOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getMyReferralsQueryKey();

  const query = useQuery({
    queryKey,
    queryFn: () => getMyReferrals(),
    ...queryOptions,
  });

  return { ...query, queryKey: queryKey as QueryKey };
}

export const redeemReferral = async (
  input: { code: string; name?: string },
  options?: RequestInit,
): Promise<{ success: boolean }> => {
  return customFetch<{ success: boolean }>(`/api/referrals/redeem`, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(input),
  });
};

export function useRedeemReferral() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { code: string; name?: string }) => redeemReferral(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMyReferralsQueryKey() });
    },
  });
}
