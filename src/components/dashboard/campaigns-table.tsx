import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CampaignSummary } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CampaignsTableProps {
  campaigns: CampaignSummary[];
  isLoading?: boolean;
}

export function CampaignsTable({ campaigns, isLoading }: CampaignsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                  Name
                </th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                  Spend
                </th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                  Leads
                </th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                  CPL
                </th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b last:border-0">
                  <td className="py-3 text-sm font-medium">{campaign.name}</td>
                  <td className="py-3 text-right text-sm">
                    {formatCurrency(campaign.spend)}
                  </td>
                  <td className="py-3 text-right text-sm">
                    {formatNumber(campaign.leads)}
                  </td>
                  <td className="py-3 text-right text-sm">
                    {formatCurrency(campaign.cpl)}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        campaign.status === "active" &&
                          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                        campaign.status === "paused" &&
                          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                        campaign.status === "completed" &&
                          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
