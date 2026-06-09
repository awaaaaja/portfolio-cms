"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultRoles } from "@/lib/utils";

export function TypingRoles({ roles }: { roles?: string[] | null }) {
  const list = useMemo(() => (roles?.length ? roles : defaultRoles), [roles]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = list[roleIndex % list.length];
    const doneTyping = text === current && !deleting;
    const doneDeleting = text === "" && deleting;
    const timeout = window.setTimeout(
      () => {
        if (doneTyping) {
          setDeleting(true);
          return;
        }
        if (doneDeleting) {
          setDeleting(false);
          setRoleIndex((index) => (index + 1) % list.length);
          return;
        }
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      },
      doneTyping ? 1300 : deleting ? 36 : 70
    );
    return () => window.clearTimeout(timeout);
  }, [deleting, list, roleIndex, text]);

  return (
    <span className="font-mono text-cyan-200">
      {"> "}
      {text}
      <span className="ml-1 inline-block h-5 w-2 translate-y-1 bg-cyan-200 animate-blink" />
    </span>
  );
}
