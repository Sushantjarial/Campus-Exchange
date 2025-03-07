export function InputBox({ label, placeholder, onChange, type }: { label: string; placeholder: string; onChange: (e: any) => void; type?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
        </div>
    );
}