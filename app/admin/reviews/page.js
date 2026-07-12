import { getAdminReviews } from "@/lib/admin/queries";
import ReviewsManager from "@/components/admin/ReviewsManager";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">Yorumlar</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Öğrenci ve mezun izlenimlerini yönetin.
        </p>
      </div>

      <ReviewsManager reviews={reviews} />
    </div>
  );
}
