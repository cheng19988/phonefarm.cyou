const SUCCESS_MESSAGE =
  "Received. A sales engineer from our Guangzhou team will reply within one business day with MOQ, lead time, and a proforma quote when applicable.";

export function ContactFormFeedback({ status }: { status?: string }) {
  if (status === "success") {
    return <p className="form-success mb-6 leading-relaxed">{SUCCESS_MESSAGE}</p>;
  }
  if (status === "error") {
    return (
      <p className="form-error mb-6">
        Could not send the form. Please message us on WhatsApp or email directly.
      </p>
    );
  }
  return null;
}
