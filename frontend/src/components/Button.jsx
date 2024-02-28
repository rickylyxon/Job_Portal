export function Button({ label, onClick }) {
  return (
    <div className="py-2 flex justify-center">
      <button
        type="button"
        class="text-white bg-zinc-600 font-medium rounded-md text-sm px-5 py-2.5 text-center my-2 size-full "
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
