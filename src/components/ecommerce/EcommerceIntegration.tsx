
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingCart as CartIcon, 
  FileText, 
  BarChart3, 
  Settings,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import ProductManager from './ProductManager';
import ShoppingCart from './ShoppingCart';
import OrderManager from './OrderManager';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku: string;
  category: string;
  tags: string[];
  images: string[];
  variants: any[];
  inventory: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  sku: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: any;
  trackingNumber?: string;
  notes?: string;
}

const EcommerceIntegration = () => {
  // Sample data - in a real app, this would come from your backend
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod-1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      comparePrice: 249.99,
      sku: 'WH-001',
      category: 'electronics',
      tags: ['audio', 'wireless', 'premium'],
      images: [],
      variants: [],
      inventory: 50,
      isActive: true,
      seoTitle: 'Premium Wireless Headphones - Best Audio Quality',
      seoDescription: 'Experience superior sound quality with our premium wireless headphones'
    },
    {
      id: 'prod-2',
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with this smart watch',
      price: 299.99,
      sku: 'SW-002',
      category: 'electronics',
      tags: ['fitness', 'smart', 'wearable'],
      images: [],
      variants: [],
      inventory: 25,
      isActive: true
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'prod-1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      sku: 'WH-001'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1',
      orderNumber: 'ORD-2024-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      orderDate: new Date('2024-01-15'),
      status: 'processing',
      items: [
        {
          id: 'item-1',
          productName: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          sku: 'WH-001'
        }
      ],
      subtotal: 199.99,
      shipping: 9.99,
      tax: 16.00,
      total: 225.98,
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA'
      },
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ord-2',
      orderNumber: 'ORD-2024-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      orderDate: new Date('2024-01-16'),
      status: 'shipped',
      items: [
        {
          id: 'item-2',
          productName: 'Smart Fitness Watch',
          quantity: 1,
          price: 299.99,
          sku: 'SW-002'
        }
      ],
      subtotal: 299.99,
      shipping: 9.99,
      tax: 24.00,
      total: 333.98,
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Another City',
        state: 'NY',
        zipCode: '67890',
        country: 'USA'
      },
      trackingNumber: 'TRK987654321'
    }
  ]);

  // Handler functions
  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = (cartData: any) => {
    console.log('Checkout data:', cartData);
    // In a real app, process the checkout here
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleAddTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, trackingNumber } : order
    ));
  };

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;

  return (
    <div className="space-y-6">
      {/* E-commerce Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{activeProducts}</p>
                <p className="text-sm text-muted-foreground">Active Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main E-commerce Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>E-commerce Management</span>
            <Badge variant="secondary">Phase 2: Full Integration</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="cart" className="flex items-center space-x-2">
                <CartIcon className="h-4 w-4" />
                <span>Cart Preview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <ProductManager
                products={products}
                onProductUpdate={handleProductUpdate}
              />
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <OrderManager
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAddTrackingNumber={handleAddTrackingNumber}
              />
            </TabsContent>

            <TabsContent value="cart" className="mt-6">
              <div className="flex justify-center">
                <ShoppingCart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Orders This Month:</span>
                        <span className="font-semibold">{orders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue This Month:</span>
                        <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Order Value:</span>
                        <span className="font-semibold">
                          ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Products:</span>
                        <span className="font-semibold">{totalProducts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Products:</span>
                        <span className="font-semibold">{activeProducts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Stock Items:</span>
                        <span className="font-semibold">
                          {products.filter(p => p.inventory < 10).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceIntegration;
