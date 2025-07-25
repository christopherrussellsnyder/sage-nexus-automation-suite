
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, User, LogOut, ChevronDown, PenTool, Globe, Megaphone, Mail, Share2, BarChart3, DollarSign, Rocket, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useCopySettings } from '@/hooks/useCopySettings';

interface HeaderProps {
  user?: any;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const copy = useCopySettings();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Brain className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-white">{copy.brandName}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-3">
          {location.pathname === '/' ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/pricing')} className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>Pricing</span>
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')} className="flex items-center space-x-1">
                <Rocket className="h-4 w-4" />
                <span>Start My Transformation</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>Overview</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/pricing')}>Pricing</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard?tab=intelligence')}>Intelligence</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard?tab=ecommerce')}>E-commerce Domination</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard?tab=agency')}>Agency Scale System</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard?tab=sales')}>Sales Acceleration Hub</Button>
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1">
                      <PenTool className="h-4 w-4" />
                      <span>{copy.copywritingToolsLabel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/website-copy')}>
                      <Globe className="h-4 w-4 mr-2" />
                      Website Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/ad-copy')}>
                      <Megaphone className="h-4 w-4 mr-2" />
                      Ad Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/email-sequences')}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Sequences
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/social-content')}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Social Content
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{copy.accountLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  {copy.dashboardLabel}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  {copy.adminPanelLabel}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {copy.signOutLabel}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/login')} className="flex items-center space-x-1">
              <LogIn className="h-4 w-4" />
              <span>{copy.signInLabel}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
