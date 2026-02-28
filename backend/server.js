// 1. Add 'isLoading' to your state at the top of the App component
const [isLoading, setIsLoading] = useState(false);

// 2. Updated handleInquiry with "Wait & Retry" logic
const handleInquiry = async (e) => {
  e.preventDefault();
  setIsLoading(true); // Start the spinner
  
  try {
    const res = await axios.post("https://kenfiba-portal.onrender.com/api/inquiries", form, {
      timeout: 30000 // Give the Sharded Cluster 30s to respond
    });
    setTrackingId(res.data.trackingId);
    setIsSubmitted(true);
  } catch (err) {
    console.error("Connection attempt failed:", err.message);
    // Alert only if it's a hard failure, not just a slow wake-up
    alert("National Registry is currently waking up. Please wait 10 seconds and click Submit again.");
  } finally {
    setIsLoading(false); // Stop the spinner
  }
};

// 3. Updated Button in your Form JSX
<button 
  type="submit" 
  disabled={isLoading}
  className={`w-full py-8 font-black uppercase text-[11px] tracking-[0.5em] transition-all shadow-2xl ${
    isLoading ? 'bg-gray-400 cursor-wait' : 'bg-red-700 hover:bg-black text-white'
  }`}
>
  {isLoading ? "⏳ SECURING CONNECTION TO ARCHIVE..." : "Submit to Secretariat Archive"}
</button>