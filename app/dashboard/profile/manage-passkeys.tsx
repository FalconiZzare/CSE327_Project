"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { KeyRound, Trash2, Pencil, Check, X, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function DeviceChip({ type }: { type: string }) {
  const label =
    type === "singleDevice" ? "Single-device" : type === "multiDevice" ? "Multi-device" : type;
  return (
    <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
      {label}
    </span>
  );
}

function generatePasskeyName(): string {
  const ua = navigator.userAgent;

  let browser = "Browser";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Safari/")) browser = "Safari";

  let os = "Device";
  if (ua.includes("iPhone")) os = "iPhone";
  else if (ua.includes("iPad")) os = "iPad";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Macintosh") || ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Linux")) os = "Linux";

  return `${browser} on ${os}`;
}

export function ManagePasskeys() {
  const { data: passkeys, isPending: loading } = authClient.useListPasskeys();
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const [addPending, setAddPending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [renamePending, setRenamePending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) editRef.current?.focus();
  }, [editingId]);

  useEffect(() => {
    if (nameDialogOpen) {
      setTimeout(() => {
        nameInputRef.current?.select();
      }, 50);
    }
  }, [nameDialogOpen]);

  function openNameDialog() {
    setPendingName(generatePasskeyName());
    setNameDialogOpen(true);
  }

  async function handleAdd() {
    const name = pendingName.trim() || undefined;
    setNameDialogOpen(false);
    setAddPending(true);
    const { error } = await authClient.passkey.addPasskey({ name });
    setAddPending(false);
    if (error) {
      toast.error(error.message ?? "Failed to add passkey");
    } else {
      toast.success("Passkey added");
    }
  }

  function startEdit(pk: { id: string; name?: string | null }) {
    setEditingId(pk.id);
    setEditName(pk.name ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function handleRename(id: string) {
    const trimmed = editName.trim();
    setRenamePending(true);
    const { error } = await authClient.passkey.updatePasskey({
      id,
      name: trimmed || "Unnamed Passkey"
    });
    setRenamePending(false);
    if (error) {
      toast.error(error.message ?? "Failed to rename passkey");
    } else {
      toast.success("Passkey renamed");
      cancelEdit();
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await authClient.passkey.deletePasskey({ id });
    setDeletingId(null);
    if (error) {
      toast.error(error.message ?? "Failed to delete passkey");
    } else {
      toast.success("Passkey removed");
    }
  }

  return (
    <>
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent className="rounded-none sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Name this passkey</DialogTitle>
          </DialogHeader>
          <Input
            ref={nameInputRef}
            value={pendingName}
            onChange={(e) => setPendingName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setNameDialogOpen(false);
            }}
            placeholder="Passkey name"
            className="rounded-none text-sm"
            aria-label="passkey-name"
          />
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={() => setNameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" className="rounded-none" onClick={handleAdd}>
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-semibold">Passkeys</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Password-free sign-in using your device biometrics or security key.
          </p>
        </div>

        <div>
          {loading ? (
            <div className="divide-y">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-4">
                  <Skeleton className="size-4 shrink-0 rounded-none" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-3 w-36 rounded-none" />
                    <Skeleton className="h-2.5 w-24 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          ) : !passkeys || passkeys.length === 0 ? (
            <div className="text-muted-foreground flex items-center gap-2.5 px-5 py-6 text-xs">
              <KeyRound className="size-3.5 shrink-0" strokeWidth={1.75} />
              No passkeys registered yet.
            </div>
          ) : (
            <div className="divide-y">
              {passkeys.map((pk) => {
                const isEditing = editingId === pk.id;
                const isDeleting = deletingId === pk.id;
                const date = pk.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }).format(new Date(pk.createdAt))
                  : null;

                return (
                  <div
                    key={pk.id}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3.5 transition-opacity",
                      isDeleting && "pointer-events-none opacity-40"
                    )}
                  >
                    <KeyRound
                      className="text-muted-foreground mt-0.5 size-4 shrink-0 self-start"
                      strokeWidth={1.75}
                    />

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            ref={editRef}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRename(pk.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                            placeholder="Passkey name"
                            className="h-7 rounded-none text-xs"
                            disabled={renamePending}
                            aria-label="paskey-rename"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 shrink-0 rounded-none"
                            onClick={() => handleRename(pk.id)}
                            disabled={renamePending}
                            aria-label="paskey-rename"
                          >
                            <Check className="size-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 shrink-0 rounded-none"
                            onClick={cancelEdit}
                            disabled={renamePending}
                            aria-label="paskey-rename-canel"
                          >
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm leading-tight font-medium">
                          {pk.name ?? (
                            <span className="text-muted-foreground italic">Unnamed passkey</span>
                          )}
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <DeviceChip type={pk.deviceType} />
                        {date && (
                          <>
                            <span className="text-muted-foreground text-[10px]">·</span>
                            <span className="text-muted-foreground text-[10px]">{date}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {!isEditing && (
                      <div className="flex shrink-0 items-center gap-0.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-muted-foreground hover:text-foreground size-7 rounded-none"
                          onClick={() => startEdit(pk)}
                          disabled={isDeleting}
                          aria-label="paskey-edit"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-muted-foreground hover:text-destructive size-7 rounded-none"
                          onClick={() => handleDelete(pk.id)}
                          disabled={isDeleting}
                          aria-label="paskey-delete"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t px-5 py-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-none"
            onClick={openNameDialog}
            disabled={addPending}
          >
            <Plus className="size-3.5" />
            {addPending ? "Registering…" : "Add Passkey"}
          </Button>
        </div>
      </div>
    </>
  );
}
