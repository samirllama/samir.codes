import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { db } from "@/db";
import { passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = params;

  const resetToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    redirect("/forgot-password?error=invalid_or_expired_token");
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
      <ResetPasswordForm token={token} />
    </div>
  );
}
