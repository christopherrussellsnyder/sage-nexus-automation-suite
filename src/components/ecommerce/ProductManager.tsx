
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Package, DollarSign, BarChart3, Eye } from 'lucide-react';

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
  variants: ProductVariant[];
  inventory: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku: string;
  inventory: number;
  options: { [key: string]: string };
}

interface ProductManagerProps {
  products: Product[];
  onProductUpdate: (products: Product[]) => void;
}

const ProductManager = ({ products, onProductUpdate }: ProductManagerProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const createNewProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: 'New Product',
      description: '',
      price: 0,
      sku: `SKU-${Date.now()}`,
      category: 'general',
      tags: [],
      images: [],
      variants: [],
      inventory: 0,
      isActive: false
    };
    
    const updatedProducts = [...products, newProduct];
    onProductUpdate(updatedProducts);
    setSelectedProduct(newProduct);
    setIsEditing(true);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onProductUpdate(updatedProducts);
    setSelectedProduct(updatedProduct);
  };

  const deleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    onProductUpdate(updatedProducts);
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  };

  const addVariant = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newVariant: ProductVariant = {
      id: `variant-${Date.now()}`,
      name: 'New Variant',
      price: product.price,
      sku: `${product.sku}-VAR`,
      inventory: 0,
      options: {}
    };

    const updatedProduct = {
      ...product,
      variants: [...product.variants, newVariant]
    };

    updateProduct(updatedProduct);
  };

  return (
    <div className="h-full flex">
      {/* Product List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Products</h3>
            <Button size="sm" onClick={createNewProduct}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <Input placeholder="Search products..." className="w-full" />
        </div>

        <div className="overflow-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedProduct?.id === product.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => {
                setSelectedProduct(product);
                setIsEditing(false);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${product.price} • {product.inventory} in stock
                  </p>
                  <div className="flex items-center mt-2 space-x-1">
                    <Badge 
                      variant={product.isActive ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {product.isActive ? 'Active' : 'Draft'}
                    </Badge>
                    {product.variants.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {product.variants.length} variants
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 overflow-auto">
        {selectedProduct ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <div className="flex space-x-2">
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={selectedProduct.name}
                        onChange={(e) => updateProduct({ ...selectedProduct, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={selectedProduct.description}
                        onChange={(e) => updateProduct({ ...selectedProduct, description: e.target.value })}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={selectedProduct.price}
                          onChange={(e) => updateProduct({ ...selectedProduct, price: Number(e.target.value) })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="comparePrice">Compare Price</Label>
                        <Input
                          id="comparePrice"
                          type="number"
                          value={selectedProduct.comparePrice || ''}
                          onChange={(e) => updateProduct({ ...selectedProduct, comparePrice: Number(e.target.value) })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          value={selectedProduct.sku}
                          onChange={(e) => updateProduct({ ...selectedProduct, sku: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={selectedProduct.category}
                          onValueChange={(value) => updateProduct({ ...selectedProduct, category: value })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variants">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Product Variants</CardTitle>
                      <Button 
                        size="sm" 
                        onClick={() => addVariant(selectedProduct.id)}
                        disabled={!isEditing}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Variant
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedProduct.variants.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No variants created yet. Add variants for different sizes, colors, or options.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {selectedProduct.variants.map((variant) => (
                          <div key={variant.id} className="p-4 border rounded-lg">
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <Label>Variant Name</Label>
                                <Input value={variant.name} disabled={!isEditing} />
                              </div>
                              <div>
                                <Label>Price</Label>
                                <Input type="number" value={variant.price} disabled={!isEditing} />
                              </div>
                              <div>
                                <Label>SKU</Label>
                                <Input value={variant.sku} disabled={!isEditing} />
                              </div>
                              <div>
                                <Label>Inventory</Label>
                                <Input type="number" value={variant.inventory} disabled={!isEditing} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inventory">Stock Quantity</Label>
                      <Input
                        id="inventory"
                        type="number"
                        value={selectedProduct.inventory}
                        onChange={(e) => updateProduct({ ...selectedProduct, inventory: Number(e.target.value) })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="trackQuantity"
                        defaultChecked
                        disabled={!isEditing}
                      />
                      <Label htmlFor="trackQuantity">Track quantity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowBackorders"
                        disabled={!isEditing}
                      />
                      <Label htmlFor="allowBackorders">Allow customers to purchase when out of stock</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Engine Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input
                        id="seoTitle"
                        value={selectedProduct.seoTitle || ''}
                        onChange={(e) => updateProduct({ ...selectedProduct, seoTitle: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seoDescription">SEO Description</Label>
                      <Textarea
                        id="seoDescription"
                        value={selectedProduct.seoDescription || ''}
                        onChange={(e) => updateProduct({ ...selectedProduct, seoDescription: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Product Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a product from the list or create a new one to get started.
              </p>
              <Button onClick={createNewProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Product
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
