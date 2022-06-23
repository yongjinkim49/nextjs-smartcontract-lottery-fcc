import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        console.log(isWeb3Enabled)
    }, [isWeb3Enabled])
    // automatically run on load
    // then, it'll run checking the value
    // no dependency array: run anytime something re-renders
    // careful with this! because then you can get circular render
    // blank dependency array, run once on load

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])
    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
