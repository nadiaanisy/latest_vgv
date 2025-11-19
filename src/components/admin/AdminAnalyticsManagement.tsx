import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  TrendingUp, 
  ShoppingCart,
  Users,
  Star,
  Package,
  MessageSquare
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { useCustomHook } from '../../utils/customHooks';

export function AdminAnalyticsManagement() {
    const {
        t
    } = useCustomHook();
  // Mock data - in production, this would come from analytics API
//   const metrics = [
//     {
//       title: 'Total Sales',
//       value: 'RM 45,280',
//       change: '+12.5%',
//       trend: 'up',
//       icon: ShoppingCart,
//       color: 'text-green-600',
//       bgColor: 'bg-green-100',
//     },
//     {
//       title: 'Total Orders',
//       value: '342',
//       change: '+8.2%',
//       trend: 'up',
//       icon: Package,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100',
//     },
//     {
//       title: 'Total Customers',
//       value: '1,248',
//       change: '+15.3%',
//       trend: 'up',
//       icon: Users,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-100',
//     },
//     {
//       title: 'Average Rating',
//       value: '4.8/5.0',
//       change: '+0.3',
//       trend: 'up',
//       icon: Star,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-100',
//     },
//   ]

//   const productPerformance = [
//     { name: 'Family Fun Wetsuit', sales: 145, percentage: 85 },
//     { name: 'Mother & Baby Care Wetsuit', sales: 98, percentage: 65 },
//     { name: 'Sports Pro Wetsuit', sales: 76, percentage: 50 },
//     { name: 'Adventure Dive Wetsuit', sales: 23, percentage: 20 },
//   ]

//   const recentActivity = [
//     { type: 'order', message: 'New order #1234 received', time: '5 minutes ago' },
//     { type: 'review', message: 'New 5-star review on Family Fun Wetsuit', time: '1 hour ago' },
//     { type: 'customer', message: 'New customer registration', time: '2 hours ago' },
//     { type: 'order', message: 'Order #1233 completed', time: '3 hours ago' },
//     { type: 'review', message: 'New review on Mother & Baby Care Wetsuit', time: '5 hours ago' },
//   ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-foreground mb-2">{t('ANALYTICS_DASHBOARD_TITLE')}</h2>
        <p className="text-muted-foreground">
          {t('ANALYTICS_DASHBOARD_SUBTITLE')}
        </p>
      </div>

      {/* Key Metrics Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium text-foreground mb-1">
                  {metric.value}
                </div>
                <p className={`text-sm flex items-center gap-1 ${metric.color}`}>
                  <TrendingUp className="w-4 h-4" />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div> */}

      {/* Product Performance and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        {/* <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-foreground">Product Performance</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {productPerformance.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{product.name}</span>
                  <span className="text-muted-foreground">{product.sales} sales</span>
                </div>
                <Progress value={product.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* Recent Activity */}
        {/* <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'order' ? 'bg-blue-100' :
                    activity.type === 'review' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'order' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'review' && <MessageSquare className="w-4 h-4 text-yellow-600" />}
                    {activity.type === 'customer' && <Users className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Additional Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">24.8%</div>
            <Progress value={24.8} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">RM 132.50</div>
            <Progress value={65} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">96%</div>
            <Progress value={96} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
