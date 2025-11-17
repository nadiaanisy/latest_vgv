import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '../ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from 'react-i18next';

export function ProductSkeletonGrid() {
  const { t } = useTranslation();

  // You can adjust the number of skeleton rows
  const skeletonRows = Array.from({ length: 5 });

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-foreground">
          {t("PRODUCT_LIST_TITLE")}
        </CardTitle>
        <CardDescription>{t("PRODUCT_LIST_SUBTITLE")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("PRODUCT")}</TableHead>
                <TableHead>{t("CATEGORY")}</TableHead>
                <TableHead>{t("PRICE_RANGE")}</TableHead>
                <TableHead>{t("STOCK")}</TableHead>
                <TableHead>{t("OPTIONS")}</TableHead>
                <TableHead className="text-right">{t("ACTIONS")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  {/* Product (image + name) */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>

                  {/* Price Range */}
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>

                  {/* Stock */}
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>

                  {/* Options */}
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-left gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
