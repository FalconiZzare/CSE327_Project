"use client";

import * as React from "react";
import {
  PaletteIcon,
  ComponentIcon,
  UserIcon,
  BellIcon,
  SettingsIcon,
  ChevronDownIcon,
  InfoIcon
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const colors = [
  { name: "Background", bg: "bg-background", fg: "text-foreground", label: "--background" },
  { name: "Foreground", bg: "bg-foreground", fg: "text-background", label: "--foreground" },
  { name: "Primary", bg: "bg-primary", fg: "text-primary-foreground", label: "--primary" },
  {
    name: "Primary Foreground",
    bg: "bg-primary-foreground",
    fg: "text-primary",
    label: "--primary-foreground"
  },
  { name: "Secondary", bg: "bg-secondary", fg: "text-secondary-foreground", label: "--secondary" },
  { name: "Muted", bg: "bg-muted", fg: "text-muted-foreground", label: "--muted" },
  { name: "Accent", bg: "bg-accent", fg: "text-accent-foreground", label: "--accent" },
  { name: "Destructive", bg: "bg-destructive", fg: "text-white", label: "--destructive" },
  { name: "Border", bg: "bg-border", fg: "text-foreground", label: "--border" },
  { name: "Input", bg: "bg-input", fg: "text-foreground", label: "--input" },
  { name: "Ring", bg: "bg-ring", fg: "text-foreground", label: "--ring" },
  { name: "Card", bg: "bg-card", fg: "text-card-foreground", label: "--card" },
  { name: "Popover", bg: "bg-popover", fg: "text-popover-foreground", label: "--popover" },
  { name: "Sidebar", bg: "bg-sidebar", fg: "text-sidebar-foreground", label: "--sidebar" },
  {
    name: "Sidebar Primary",
    bg: "bg-sidebar-primary",
    fg: "text-sidebar-primary-foreground",
    label: "--sidebar-primary"
  },
  {
    name: "Sidebar Accent",
    bg: "bg-sidebar-accent",
    fg: "text-sidebar-accent-foreground",
    label: "--sidebar-accent"
  }
];

const chartColors = [
  { name: "Chart 1", bg: "bg-chart-1", label: "--chart-1" },
  { name: "Chart 2", bg: "bg-chart-2", label: "--chart-2" },
  { name: "Chart 3", bg: "bg-chart-3", label: "--chart-3" },
  { name: "Chart 4", bg: "bg-chart-4", label: "--chart-4" },
  { name: "Chart 5", bg: "bg-chart-5", label: "--chart-5" }
];

function Section({
  title,
  icon,
  children
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h2 className="font-heading text-foreground text-sm font-semibold">{title}</h2>
        <Separator className="flex-1" />
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-muted-foreground w-28 shrink-0 text-xs">{label}</span>
      {children}
    </div>
  );
}

export default function ThemePage() {
  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-foreground text-2xl font-semibold">Theme Preview</h1>
            <p className="text-muted-foreground text-xs">
              All design tokens and shadcn/ui components in one place.
            </p>
          </div>

          <Section title="Color Palette" icon={<PaletteIcon className="size-4" />}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="ring-foreground/10 flex flex-col overflow-hidden rounded-none ring-1"
                >
                  <div className={`flex h-16 items-center justify-center ${c.bg}`}>
                    <span className={`text-xs font-medium ${c.fg}`}>Aa</span>
                  </div>
                  <div className="bg-card flex flex-col gap-0.5 px-2 py-1.5">
                    <span className="text-card-foreground text-xs font-medium">{c.name}</span>
                    <span className="text-muted-foreground font-mono text-[10px]">{c.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-muted-foreground mb-3 text-xs">Chart Colors</p>
              <div className="flex gap-3">
                {chartColors.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1.5">
                    <div className={`size-10 rounded-none ${c.bg}`} />
                    <span className="text-muted-foreground font-mono text-[10px]">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Button" icon={<ComponentIcon className="size-4" />}>
            <Row label="Variants">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </Row>
            <Row label="Sizes">
              <Button size="xs">XSmall</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </Row>
            <Row label="Icon sizes">
              <Button size="icon-xs" variant="outline" aria-label="Notification (xs)">
                <BellIcon />
              </Button>
              <Button size="icon-sm" variant="outline" aria-label="Notification (sm)">
                <BellIcon />
              </Button>
              <Button size="icon" variant="outline" aria-label="Notification">
                <BellIcon />
              </Button>
              <Button size="icon-lg" variant="outline" aria-label="Notification (lg)">
                <BellIcon />
              </Button>
            </Row>
            <Row label="With icon">
              <Button>
                <SettingsIcon data-icon="inline-start" />
                Settings
              </Button>
              <Button variant="outline">
                Notifications
                <BellIcon data-icon="inline-end" />
              </Button>
            </Row>
            <Row label="Loading">
              <Button disabled>
                <Spinner />
                Loading...
              </Button>
            </Row>
            <Row label="Disabled">
              <Button disabled>Default</Button>
              <Button disabled variant="outline">
                Outline
              </Button>
            </Row>
          </Section>

          <Section title="Avatar" icon={<UserIcon className="size-4" />}>
            <Row label="Sizes">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" alt={"shadcn"} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar size="default">
                <AvatarImage src="https://github.com/shadcn.png" alt={"shadcn"} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt={"shadcn"} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Row>
            <Row label="Fallback">
              <Avatar size="sm">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar size="default">
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>EF</AvatarFallback>
              </Avatar>
            </Row>
            <Row label="With badge">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
                <AvatarBadge />
              </Avatar>
            </Row>
            <Row label="Group">
              <AvatarGroup>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt={"shadcn"} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+4</AvatarGroupCount>
              </AvatarGroup>
            </Row>
          </Section>

          <Section title="Card">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Card with header, content, and footer.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">
                    This is the card content area. Use it to display information, forms, or any
                    other content.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Confirm</Button>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>Small Card</CardTitle>
                  <CardDescription>Compact variant with size=&ldquo;sm&rdquo;.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">Compact card for tighter layouts.</p>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Form Inputs">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Row label="Input">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label htmlFor="email-demo">Email</Label>
                    <Input
                      id="email-demo"
                      type="email"
                      placeholder="you@example.com"
                      aria-label={"email-demo"}
                    />
                  </div>
                </Row>
                <Row label="Disabled">
                  <Input
                    disabled
                    placeholder="Disabled input"
                    className="flex-1"
                    aria-label={"disabled"}
                  />
                </Row>
                <Row label="Invalid">
                  <Input
                    aria-invalid
                    placeholder="Invalid input"
                    className="flex-1"
                    aria-label={"invalid"}
                  />
                </Row>
              </div>
              <div className="flex flex-col gap-3">
                <Row label="Textarea">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label htmlFor="bio-demo">Bio</Label>
                    <Textarea
                      id="bio-demo"
                      placeholder="Write something..."
                      rows={3}
                      aria-label={"text-area"}
                    />
                  </div>
                </Row>
                <Row label="Select">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="opt1">Option 1</SelectItem>
                        <SelectItem value="opt2">Option 2</SelectItem>
                        <SelectItem value="opt3">Option 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Row>
              </div>
            </div>
          </Section>

          <Section title="Skeleton">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
            </div>
          </Section>

          <Section title="Spinner">
            <div className="flex items-center gap-6">
              <Spinner className="size-4" />
              <Spinner className="text-primary size-5" />
              <Spinner className="text-destructive size-6" />
              <Spinner className="text-muted-foreground size-8" />
            </div>
          </Section>

          <Section title="Separator">
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="flex items-center gap-4">
                <span className="text-xs">Left</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-xs">Right</span>
              </div>
            </div>
          </Section>

          <Section title="Tooltip">
            <Row label="Positions">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Top
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Tooltip on top</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Right
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Tooltip on right</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bottom
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Left
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Tooltip on left</TooltipContent>
              </Tooltip>
            </Row>
          </Section>

          <Section title="Dropdown Menu">
            <Row label="Default">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Options
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserIcon />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SettingsIcon />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BellIcon />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Row>
          </Section>

          <Section title="Sheet">
            <Row label="Sides">
              {(["right", "left", "top", "bottom"] as const).map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="capitalize">
                      {side}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Sheet — {side}</SheetTitle>
                      <SheetDescription>
                        This panel slides in from the {side}. Use it for navigation, settings, or
                        detail views.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 px-4 py-2">
                      <p className="text-muted-foreground text-xs">Sheet content goes here.</p>
                    </div>
                    <SheetFooter>
                      <Button size="sm">Save</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              ))}
            </Row>
          </Section>

          <Section title="Typography">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-[10px]">heading / font-heading</span>
                <p className="font-heading text-2xl font-semibold">The quick brown fox</p>
              </div>
              <Separator />
              {[
                ["text-xl", "Extra Large — text-xl"],
                ["text-lg", "Large — text-lg"],
                ["text-base", "Base — text-base"],
                ["text-sm", "Small — text-sm"],
                ["text-xs", "XSmall — text-xs"],
                ["text-[10px]", "Tiny — text-[10px]"]
              ].map(([cls, label]) => (
                <p key={cls} className={cls}>
                  {label}
                </p>
              ))}
              <Separator />
              <div className="flex flex-wrap gap-4">
                <span className="text-foreground text-xs">foreground</span>
                <span className="text-muted-foreground text-xs">muted-foreground</span>
                <span className="text-primary text-xs">primary</span>
                <span className="text-destructive text-xs">destructive</span>
              </div>
            </div>
          </Section>

          <Section title="Border Radius">
            <div className="flex flex-wrap items-end gap-4">
              {[
                ["rounded-sm", "sm"],
                ["rounded-md", "md"],
                ["rounded-lg", "lg"],
                ["rounded-xl", "xl"],
                ["rounded-2xl", "2xl"],
                ["rounded-3xl", "3xl"],
                ["rounded-4xl", "4xl"],
                ["rounded-full", "full"]
              ].map(([cls, label]) => (
                <div key={cls} className="flex flex-col items-center gap-1.5">
                  <div className={`bg-primary size-10 ${cls}`} />
                  <span className="text-muted-foreground font-mono text-[10px]">{label}</span>
                </div>
              ))}
            </div>
          </Section>

          <div className="border-border bg-muted/40 flex items-start gap-2 rounded-none border px-4 py-3">
            <InfoIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <p className="text-muted-foreground text-xs">
              This page is for development reference only. It displays every installed shadcn/ui
              component and all design tokens defined in{" "}
              <code className="bg-muted rounded-none px-1 py-0.5 font-mono text-[10px]">
                globals.css
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
