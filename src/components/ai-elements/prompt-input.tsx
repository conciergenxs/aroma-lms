import * as React from "react";
import { ArrowUp, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export type PromptInputMessage = { text: string };

type PromptInputContextValue = {
  value: string;
  setValue: (value: string) => void;
  submit: () => void;
};

const PromptInputContext = React.createContext<PromptInputContextValue | null>(null);

function usePromptInput() {
  const value = React.useContext(PromptInputContext);
  if (!value) throw new Error("PromptInput components must be used inside PromptInput");
  return value;
}

export function PromptInput({ className, onSubmit, children, ...props }: Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & { onSubmit?: (message: PromptInputMessage) => void }) {
  const [value, setValue] = React.useState("");
  const submit = React.useCallback(() => {
    const text = value.trim();
    if (!text) return;
    onSubmit?.({ text });
    setValue("");
  }, [onSubmit, value]);

  return (
    <PromptInputContext.Provider value={{ value, setValue, submit }}>
      <form
        className={cn("flex items-center gap-2", className)}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        {...props}
      >
        {children}
      </form>
    </PromptInputContext.Provider>
  );
}

export const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, onChange, ...props }, ref) => {
    const { value, setValue, submit } = usePromptInput();
    return (
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          onChange?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
        className={cn("min-h-11 flex-1 resize-none rounded-full bg-card px-4 py-3 text-sm leading-5 outline-none placeholder:text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
PromptInputTextarea.displayName = "PromptInputTextarea";

export function PromptInputFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

export function PromptInputSubmit({ className, status = "ready", disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { status?: "submitted" | "streaming" | "ready" | "error" }) {
  const { value } = usePromptInput();
  const busy = status === "submitted" || status === "streaming";
  return (
    <button
      type="submit"
      disabled={disabled || (!value.trim() && !busy)}
      className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm disabled:opacity-60", className)}
      {...props}
    >
      {busy ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <ArrowUp className="h-5 w-5" />}
    </button>
  );
}