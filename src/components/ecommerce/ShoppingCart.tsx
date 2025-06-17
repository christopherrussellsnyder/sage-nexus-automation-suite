
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2, CreditCard, Truck } from 'lucide-react';

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

interface ShippingRate {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (cartData: any) => void;
}

const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [shippingRates] = useState<ShippingRate[]>([
    { id: 'standard', name: 'Standard Shipping', price: 5.99, estimatedDays: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, estimatedDays: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 24.99, estimatedDays: '1 business day' }
  ]);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingRates.find(rate => rate.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingCost + tax - discountAmount;

  const applyDiscount = () => {
    // Simple discount logic
    const discountCodes: { [key: string]: number } = {
      'SAVE10': subtotal * 0.1,
      'WELCOME': 5,
      'FREESHIP': shippingCost
    };
    
    if (discountCodes[discountCode.toUpperCase()]) {
      setDiscountAmount(discountCodes[discountCode.toUpperCase()]);
    }
  };

  const handleCheckout = () => {
    const checkoutData = {
      items,
      subtotal,
      shippingCost,
      tax,
      discount: discountAmount,
      total,
      discountCode: discountCode || null,
      selectedShipping
    };
    
    onCheckout(checkoutData);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <CartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some products to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CartIcon className="h-5 w-5" />
            <span>Shopping Cart ({items.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-4 max-h-64 overflow-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <span className="text-xs font-medium">{item.name.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">{item.variant}</p>
                  )}
                  <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Discount Code */}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button onClick={applyDiscount} variant="outline">
                Apply
              </Button>
            </div>
            {discountAmount > 0 && (
              <Badge variant="secondary" className="w-full justify-center">
                Discount applied: -${discountAmount.toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Shipping Options */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Shipping</span>
            </h4>
            <div className="space-y-2">
              {shippingRates.map((rate) => (
                <label key={rate.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="radio"
                    name="shipping"
                    value={rate.id}
                    checked={selectedShipping === rate.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                  />
                  <span className="flex-1">
                    {rate.name} - ${rate.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {rate.estimatedDays}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button onClick={handleCheckout} className="w-full" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
