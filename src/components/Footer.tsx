export function Footer() {
  return (
    <footer className="border-t border-rule py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 font-sans text-xs text-muted md:flex-row md:justify-between md:px-10">
        <p>&copy; {new Date().getFullYear()} Abhimanyu Patel</p>
        <p>Essays are published on Substack and linked here, never copied.</p>
      </div>
    </footer>
  );
}
