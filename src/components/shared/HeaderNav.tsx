import { Link } from "@tanstack/react-router"
import { HelpCircle, History, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/DropdownMenu"

const iconButtonClass =
  "flex size-12 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"

export const HeaderNav = () => (
  <>
    {/* Mobile: Menu with dropdown */}
    <div className="min-[440px]:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={iconButtonClass}>
            <Menu className="size-6" />
            <span className="sr-only">Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/history">
              <History />
              History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/about">
              <HelpCircle />
              About
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Desktop: Both icons visible */}
    <div className="hidden items-center gap-2 min-[440px]:flex">
      <Link to="/history" className={iconButtonClass}>
        <History className="size-6" />
        <span className="sr-only">History</span>
      </Link>
      <Link to="/about" className={iconButtonClass}>
        <HelpCircle className="size-6" />
        <span className="sr-only">About Wortle</span>
      </Link>
    </div>
  </>
)
