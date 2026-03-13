'use client';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-x-0 bottom-0 z-50 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:rounded-2xl rounded-t-2xl bg-[#1A1A1A] p-6 md:max-h-[90vh] overflow-y-auto">
        <h3 className="text-white font-bold text-lg mb-4">
          개인정보 수집·이용 동의
        </h3>
        <div className="text-[#CCCCCC] text-sm space-y-3">
          <p><strong className="text-white">수집 항목:</strong> 휴대폰 번호</p>
          <p><strong className="text-white">수집 목적:</strong> Realmate 앱 출시 알림 문자 발송</p>
          <p>
            <strong className="text-white">보유 기간:</strong> 앱 출시 후 알림 발송 완료 시 즉시 파기
            <br />
            (최대 6개월, 미출시 시 수집일로부터 6개월 후 자동 파기)
          </p>
          <p className="text-white/80">
            동의를 거부할 권리가 있으며, 거부 시 사전예약 참여가 불가합니다.
          </p>
          <p><strong className="text-white">운영사:</strong> LABOON</p>
          <p><strong className="text-white">연락처:</strong> dev.mark2357@gmail.com</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full h-12 rounded-xl bg-[#FF6B35] text-white font-semibold hover:bg-[#FF8C5A] transition-colors"
        >
          확인
        </button>
      </div>
    </>
  );
}
