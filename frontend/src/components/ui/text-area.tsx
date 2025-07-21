type Props = {
  placeholder: string;
  rows: number;
  value?: string;
};
export const TextArea = ({ placeholder, rows, value }: Props) => {
  return (
    <div className="has-[:focus]:border-white flex items-center rounded-3xl border-2 border-gray-700">
      <textarea
        placeholder={placeholder}
        className="outline-none flex-1 bg-transparent h-full resize-none p-5"
        value={value}
        rows={rows}
      ></textarea>
    </div>
  );
};
