import { useSharedState } from "./SharedStateContext";

const CodeRight: React.FC = () => {
  const { programOutput, programInput } = useSharedState();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (programInput.current) {
      programInput.current = e.target.value;
    }
  };

  return (
    <div className="p-2 text-black">
      <div className="flex flex-col h-full">
        {/* Input Section */}
        <textarea
          className="w-full p-2 border rounded h-1/2 resize-none"
          placeholder="Enter input here..."
          onChange={handleInputChange}  // A function to handle input change
          value={programInput.current || ""}  // Optionally handle controlled value
        />

        {/* Output Section */}
        <div className="bg-gray-100 border rounded h-1/2 p-2 overflow-auto">
          <pre>{programOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeRight;
