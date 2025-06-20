
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
import { useCopySettings } from '@/hooks/useCopySettings';

interface HeaderProps {
  user?: any;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const copy = useCopySettings();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">{copy.brandName}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/features" className="text-gray-600 hover:text-gray-900">{copy.featuresLabel}</a>
          <a href="/pricing" className="text-gray-600 hover:text-gray-900">{copy.pricingLabel}</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">{copy.aboutLabel}</a>
          
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
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  Admin Panel
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
                {copy.signInLabel}
              </Button>
              <Button onClick={() => navigate('/signup')}>
                {copy.getStartedLabel}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
