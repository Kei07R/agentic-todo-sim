export default function Button({ children }) {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
      {children}
    </button>
  );
}