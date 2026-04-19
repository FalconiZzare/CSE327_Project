"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/categories";

type DishData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  available: boolean;
};

interface DishFormProps {
  dish?: DishData;
  action: (formData: FormData) => Promise<void>;
}

export function DishForm({ dish, action }: DishFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(dish?.imageUrl ?? null);
  const [isExistingImage, setIsExistingImage] = useState(!!dish?.imageUrl);
  const [removeImage, setRemoveImage] = useState(false);
  const [available, setAvailable] = useState(dish?.available ?? true);
  const [category, setCategory] = useState(dish?.category ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setIsExistingImage(false);
    setRemoveImage(false);
  }

  function handleRemoveImage(e: React.MouseEvent) {
    e.stopPropagation();
    setImagePreview(null);
    setIsExistingImage(false);
    if (dish?.imageUrl) setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.set("available", String(available));
    formData.set("category", category);
    formData.set("removeImage", String(removeImage));

    startTransition(async () => {
      try {
        await action(formData);
        toast.success(dish ? "Dish updated!" : "Dish created!");
        router.push("/dashboard/dishes");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="image">Dish Image</Label>

        <div
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors",
            imagePreview
              ? "border-border h-64"
              : "border-muted-foreground/25 hover:border-muted-foreground/50 h-48"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Dish preview"
                fill
                unoptimized={!isExistingImage}
                className="rounded-xl object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                onClick={handleRemoveImage}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                Click to replace
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="bg-muted rounded-full p-3">
                <Upload className="text-muted-foreground h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-muted-foreground text-xs">JPG, PNG, or WebP</p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            For the crispest card display, use a <strong>square (1:1) image</strong> at{" "}
            <strong>800 × 800 px</strong> or larger. Max file size: <strong>5 MB</strong>. Accepted
            formats: JPG, PNG, WebP.
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={dish?.name}
          required
          placeholder="e.g. Margherita Pizza"
          disabled={isPending}
          aria-label="Dish name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={dish?.description}
          required
          placeholder="Describe the dish, its ingredients, and what makes it special…"
          rows={3}
          disabled={isPending}
          aria-label="Dish description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory} disabled={isPending} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent side="top" position="popper">
            {CATEGORY_LABELS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (BDT)</Label>
        <div className="relative">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm select-none">
            ৳
          </span>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={dish ? Number(dish.price).toFixed(2) : ""}
            required
            placeholder="0.00"
            className="pl-7"
            disabled={isPending}
            aria-label="Dish price"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="available"
          checked={available}
          onCheckedChange={setAvailable}
          disabled={isPending}
        />
        <Label htmlFor="available" className="cursor-pointer">
          Available to customers
        </Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending || !category}>
          {isPending ? (dish ? "Saving…" : "Creating…") : dish ? "Save Changes" : "Create Dish"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/dishes")}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
