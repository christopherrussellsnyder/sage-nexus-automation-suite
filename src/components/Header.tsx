
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, User, LogOut, ChevronDown, PenTool, Globe, Megaphone, Mail, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  user?: any;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Sage.ai</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <PenTool className="h-4 w-4" />
                  <span>Copywriting Tools</span>
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
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
