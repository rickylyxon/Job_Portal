export function Input({ label, placeholder, type, id ,onChange}) {
  return (
    <div className=" py-1 flex flex-col justify-center">
      <label for={id} className="mb-1 text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}
