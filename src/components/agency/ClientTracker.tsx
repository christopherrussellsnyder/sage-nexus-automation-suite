
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  value: number;
  projects: number;
  lastContact: string;
  satisfaction: number;
}

interface ClientTrackerProps {
  onBack: () => void;
}

const ClientTracker = ({ onBack }: ClientTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    status: 'active',
    value: 0,
    projects: 0,
    satisfaction: 90
  });
  const { toast } = useToast();

  // Mock client data
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Acme Corporation',
      contact: 'John Smith',
      email: 'john@acme.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      value: 50000,
      projects: 3,
      lastContact: '2024-01-15',
      satisfaction: 95
    },
    {
      id: 2,
      name: 'TechStart Inc',
      contact: 'Sarah Johnson',
      email: 'sarah@techstart.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      value: 75000,
      projects: 2,
      lastContact: '2024-01-12',
      satisfaction: 88
    },
    {
      id: 3,
      name: 'Global Solutions',
      contact: 'Mike Wilson',
      email: 'mike@globalsolutions.com',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      value: 30000,
      projects: 1,
      lastContact: '2024-01-10',
      satisfaction: 92
    }
  ]);

  const handleAddClient = () => {
    if (!newClient.name || !newClient.contact || !newClient.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const client: Client = {
      id: Date.now(),
      ...newClient,
      lastContact: new Date().toISOString().split('T')[0]
    };

    setClients(prev => [...prev, client]);
    setNewClient({
      name: '',
      contact: '',
      email: '',
      phone: '',
      status: 'active',
      value: 0,
      projects: 0,
      satisfaction: 90
    });
    setShowAddClient(false);

    toast({
      title: "Client Added",
      description: `${client.name} has been added successfully`,
    });
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setNewClient({
      name: client.name,
      contact: client.contact,
      email: client.email,
      phone: client.phone,
      status: client.status,
      value: client.value,
      projects: client.projects,
      satisfaction: client.satisfaction
    });
  };

  const handleUpdateClient = () => {
    if (!editingClient) return;

    const updatedClient = {
      ...editingClient,
      ...newClient
    };

    setClients(prev => prev.map(client => 
      client.id === editingClient.id ? updatedClient : client
    ));

    setEditingClient(null);
    setNewClient({
      name: '',
      contact: '',
      email: '',
      phone: '',
      status: 'active',
      value: 0,
      projects: 0,
      satisfaction: 90
    });

    toast({
      title: "Client Updated",
      description: `${updatedClient.name} has been updated successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Agency Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Client Management</h2>
          <p className="text-muted-foreground">
            Manage your client relationships and track project progress
          </p>
        </div>
        <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Add a new client to your database
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact Person *</Label>
                <Input
                  id="contact"
                  value={newClient.contact}
                  onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="value">Project Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={newClient.value}
                  onChange={(e) => setNewClient({ ...newClient, value: parseInt(e.target.value) || 0 })}
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newClient.status} onValueChange={(value) => setNewClient({ ...newClient, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddClient} className="flex-1">Add Client</Button>
                <Button variant="outline" onClick={() => setShowAddClient(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Client Dialog */}
      <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Company Name *</Label>
              <Input
                id="edit-name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="edit-contact">Contact Person *</Label>
              <Input
                id="edit-contact"
                value={newClient.contact}
                onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="john@acme.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="edit-value">Project Value</Label>
              <Input
                id="edit-value"
                type="number"
                value={newClient.value}
                onChange={(e) => setNewClient({ ...newClient, value: parseInt(e.target.value) || 0 })}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={newClient.status} onValueChange={(value) => setNewClient({ ...newClient, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdateClient} className="flex-1">Update Client</Button>
              <Button variant="outline" onClick={() => setEditingClient(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">${clients.reduce((sum, client) => sum + client.value, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
          <CardDescription>
            Manage your client relationships and track key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.contact}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {client.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="font-semibold">${client.value.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{client.projects}</p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{client.satisfaction}%</p>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                    </div>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientTracker;
