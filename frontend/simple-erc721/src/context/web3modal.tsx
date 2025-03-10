
// context/AppKit.tsx

'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia, holesky } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
var projectId = "";
if (process.env.NEXT_PUBLIC_REOWN_PROJECT_ID != undefined){
    projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
}

// 2. Create a metadata object
const metadata = {
  name: 'testProject',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [sepolia, holesky],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit() {
  return (
    <div>
        <w3m-button></w3m-button>
    </div> //make sure you have configured the <w3m-button> inside
  )
}