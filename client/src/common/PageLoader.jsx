import { Loader2 } from "lucide-react";

const PageLoader = ({
  text = "Loading...",
}) => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">

      <div className="flex flex-col items-center gap-4">

        <div className="w-16 h-16 rounded-3xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">

          <Loader2
            size={32}
            className="animate-spin text-[var(--primary)]"
          />

        </div>

        <div className="text-center">

          <h3 className="text-lg font-semibold text-[var(--heading)]">

            {text}

          </h3>

          <p className="text-sm text-[var(--text)] mt-1">

            Please wait a moment

          </p>

        </div>

      </div>

    </div>
  );
};

export default PageLoader;