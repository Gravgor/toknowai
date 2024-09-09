"use client"
import { forwardRef, useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { PersonIcon, EnterIcon, ExitIcon, BellIcon, MoonIcon, SunIcon, GearIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const UserNavbar = () => {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Implement actual dark mode logic here
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-transparent text-white">
      <Link href="/" className="text-xl font-bold">
        ToKnowAI
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Featured Course
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore our most popular AI course
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/courses/ai-basics" title="AI Basics">
                  Introduction to Artificial Intelligence
                </ListItem>
                <ListItem href="/courses/machine-learning" title="Machine Learning">
                  Fundamentals of Machine Learning
                </ListItem>
                <ListItem href="/courses/deep-learning" title="Deep Learning">
                  Advanced Neural Networks
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {session ? (
       <div className="flex items-center space-x-2">
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon">
             <BellIcon className="h-6 w-6" />
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
           <DropdownMenuItem>No new notifications</DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
       <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
         {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
       </Button>
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="relative h-8 w-8 rounded-full">
             <Avatar className="h-8 w-8">
               <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
               <AvatarFallback>{session.user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
             </Avatar>
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/help">Help & Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => signIn()} disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
            ) : (
              <>
                <EnterIcon className="mr-2 h-4 w-4" />
                Log in
              </>
            )}
          </Button>
          <Button size="sm" onClick={() => signIn()}>
            <PersonIcon className="mr-2 h-4 w-4" />
            Sign up
          </Button>
        </div>
      )}
    </div>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default UserNavbar
