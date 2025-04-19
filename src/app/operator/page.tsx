"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"
import { User, Shield, Award, Server, Wifi } from "lucide-react"

export default function OperatorPage() {
  const [userInfo, setUserInfo] = useState({
    username: "blockchain_operator",
    joinDate: "March 15, 2023",
    nodesOperated: 3,
    totalStaked: "15,000 OXH",
    rewardsEarned: "2,345 OXH",
    uptime: "99.97%",
  })

  useEffect(() => {
    initAnimations()
  }, [])

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold text-white mb-6">Become an OxHash Operator</h1>
            <p className="scroll-trigger text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Join our network of node operators and earn rewards while supporting the OxHash ecosystem.
            </p>

            {/* Bitcoin animation */}
            

            <Button className="btn-primary btn-hover-effect">Apply Now</Button>
          </div>

          {/* User Info Card */}
          <div className="mb-12">
            <div className="user-info-card max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <User size={48} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{userInfo.username}</h2>
                  <p className="text-indigo-300 mb-4">Node Operator since {userInfo.joinDate}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-indigo-300 mb-1">
                        <Server size={16} />
                        <span className="text-sm">Nodes</span>
                      </div>
                      <div className="text-xl font-bold text-white">{userInfo.nodesOperated}</div>
                    </div>
                    <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-indigo-300 mb-1">
                        <Shield size={16} />
                        <span className="text-sm">Staked</span>
                      </div>
                      <div className="text-xl font-bold text-white">{userInfo.totalStaked}</div>
                    </div>
                    <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-indigo-300 mb-1">
                        <Award size={16} />
                        <span className="text-sm">Rewards</span>
                      </div>
                      <div className="text-xl font-bold text-white">{userInfo.rewardsEarned}</div>
                    </div>
                    <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-indigo-300 mb-1">
                        <Wifi size={16} />
                        <span className="text-sm">Uptime</span>
                      </div>
                      <div className="text-xl font-bold text-white">{userInfo.uptime}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button className="btn-primary btn-hover-effect">Manage Nodes</Button>
                    <Button variant="outline" className="border-indigo-500 text-white hover:bg-indigo-900">
                      View Rewards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="scroll-trigger-left">
              <h2 className="text-2xl font-bold text-white mb-6">Operator Requirements</h2>
              <div className="bg-black bg-opacity-30 rounded-xl p-8 border border-indigo-900 border-opacity-30">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Minimum Stake</h3>
                      <p className="text-gray-300 text-sm">10,000 OXH tokens staked for at least 6 months.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Hardware</h3>
                      <p className="text-gray-300 text-sm">
                        Dedicated server with minimum 8 CPU cores, 16GB RAM, 1TB SSD.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Network</h3>
                      <p className="text-gray-300 text-sm">100Mbps+ connection with 99.9% uptime guarantee.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Technical Knowledge</h3>
                      <p className="text-gray-300 text-sm">Experience with Linux server administration and Docker.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="scroll-trigger-right">
              <h2 className="text-2xl font-bold text-white mb-6">Operator Benefits</h2>
              <div className="bg-black bg-opacity-30 rounded-xl p-8 border border-indigo-900 border-opacity-30">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Staking Rewards</h3>
                      <p className="text-gray-300 text-sm">Earn up to 15% APY on your staked OXH tokens.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Transaction Fees</h3>
                      <p className="text-gray-300 text-sm">
                        Receive a portion of transaction fees processed by your node.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Governance Rights</h3>
                      <p className="text-gray-300 text-sm">
                        Participate in network governance decisions with voting rights.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Early Access</h3>
                      <p className="text-gray-300 text-sm">Get early access to new features and protocol upgrades.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 rounded-xl p-8 mb-20 border border-indigo-900 border-opacity-30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Operator Performance Metrics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  <span className="animated-counter" data-target="99.98" data-suffix="%"></span>
                </div>
                <p className="text-gray-300">Average Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  <span className="animated-counter" data-target="12.4" data-suffix="%"></span>
                </div>
                <p className="text-gray-300">Average APY</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  <span className="animated-counter" data-target="248" data-suffix=""></span>
                </div>
                <p className="text-gray-300">Active Operators</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  <span className="animated-counter" data-target="5200000" data-suffix=""></span>
                </div>
                <p className="text-gray-300">Total OXH Staked</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to Join Our Network?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Complete our application process and start earning rewards as an OxHash operator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary btn-hover-effect">Apply Now</Button>
              <Button variant="outline" className="border-indigo-500 text-white hover:bg-indigo-900">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
