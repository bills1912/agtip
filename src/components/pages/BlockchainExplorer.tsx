import React, { useState, useCallback } from 'react';
import { Layers, Link, FileText, Globe, Search,  Eye, Copy, ExternalLink } from 'lucide-react';
import type { Block, Transaction, SmartContract, NetworkStats } from '../../types/blockchain';
import { useInterval } from '../../hooks/useInterval';
import { useToggle } from '../../hooks/useToggle';
import { formatRelativeTime, } from '../../utils/formatters';

export const BlockchainExplorer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'blocks' | 'transactions' | 'contracts' | 'network'>('blocks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLiveUpdates, toggleLiveUpdates] = useToggle(true);

  // Mock network statistics
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalBlocks: 2847392,
    totalTransactions: 18700000,
    averageBlockTime: 15.2,
    activeValidators: 127,
    pendingTransactions: 1234,
    networkHashRate: '2.4 TH/s'
  });

  // Mock blocks data
  const [blocks] = useState<Block[]>([
    {
      number: '2847392',
      hash: '0xa7b4c8e9d2f1a6b5c3e8d9f2a1b4c7e0d3f6a9b2c5e8d1f4a7b0c3e6d9f2a5b8',
      parentHash: '0x9c3e8d1f4a7b0c3e6d9f2a5b8c1e4d7f0a3b6c9e2f5a8d1b4c7e0f3a6b9c2e5',
      timestamp: '2024-01-15T14:32:17Z',
      transactions: 847,
      validator: 'BI-Node-01',
      size: '2.4 MB',
      gasUsed: '12450000',
      gasLimit: '15000000',
      difficulty: '0x1bc16d674ec80000'
    },
    {
      number: '2847391',
      hash: '0x9c3e8d1f4a7b0c3e6d9f2a5b8c1e4d7f0a3b6c9e2f5a8d1b4c7e0f3a6b9c2e5',
      parentHash: '0x5f2a8d1b4c7e0f3a6b9c2e5d8f1a4b7c0e3f6a9b2c5e8d1f4a7b0c3e6d9f2a5',
      timestamp: '2024-01-15T14:32:02Z',
      transactions: 923,
      validator: 'OJK-Node-03',
      size: '2.8 MB',
      gasUsed: '13890000',
      gasLimit: '15000000',
      difficulty: '0x1bc16d674ec80000'
    },
    {
      number: '2847390',
      hash: '0x5f2a8d1b4c7e0f3a6b9c2e5d8f1a4b7c0e3f6a9b2c5e8d1f4a7b0c3e6d9f2a5',
      parentHash: '0x3d1b4c7e0f3a6b9c2e5d8f1a4b7c0e3f6a9b2c5e8d1f4a7b0c3e6d9f2a5b8c1',
      timestamp: '2024-01-15T14:31:47Z',
      transactions: 756,
      validator: 'BPS-Node-02',
      size: '2.1 MB',
      gasUsed: '11340000',
      gasLimit: '15000000',
      difficulty: '0x1bc16d674ec80000'
    },
    {
      number: '2847389',
      hash: '0x3d1b4c7e0f3a6b9c2e5d8f1a4b7c0e3f6a9b2c5e8d1f4a7b0c3e6d9f2a5b8c1',
      parentHash: '0x1e4d7f0a3b6c9e2f5a8d1b4c7e0f3a6b9c2e5d8f1a4b7c0e3f6a9b2c5e8d1f4',
      timestamp: '2024-01-15T14:31:32Z',
      transactions: 1124,
      validator: 'PEMDA-Node-JKT',
      size: '3.2 MB',
      gasUsed: '14560000',
      gasLimit: '15000000',
      difficulty: '0x1bc16d674ec80000'
    }
  ]);

  // Mock transactions data
  const [transactions] = useState<Transaction[]>([
    {
      hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      blockNumber: '2847392',
      from: '0x742d35cc6634c0532925a3b8d1b9e9b8e8a5f1234567890abcdef123456789012',
      to: '0x8a2e4f1c5b7d9e3a6f8b2c4e6a8d1f3b5c7e9a2d4f6b8c1e3a5d7f9b2e4c6a8',
      value: '1500000000000000000',
      gasPrice: '20000000000',
      gasUsed: '21000',
      timestamp: '2024-01-15T14:32:17Z',
      status: 'confirmed',
      type: 'property_update'
    },
    {
      hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
      blockNumber: '2847392',
      from: '0x852f41e8c7b9d3e6a8f2b4c6e8a1d3f5b7c9e2a4d6f8b1c3e5a7d9f2b4e6c8a1',
      to: '0x9b3f5e2d8c1a4f7b9d2e5a8c1f4b7e0a3d6f9c2e5b8d1a4f7c0e3b6f9d2a5c8',
      value: '750000000000000000',
      gasPrice: '22000000000',
      gasUsed: '45000',
      timestamp: '2024-01-15T14:32:15Z',
      status: 'confirmed',
      type: 'fraud_report'
    },
    {
      hash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef123456789a',
      blockNumber: '2847391',
      from: '0x963g52f9d8c2b5e8a1d4f7c0e3b6f9d2a5c8e1b4d7a0c3f6e9b2d5a8c1e4f7b0',
      to: '0xac4g63e0f9d3c6f9e2b5d8a1c4f7e0b3d6a9c2f5e8b1d4a7c0f3e6b9c2f5a8d1',
      value: '2250000000000000000',
      gasPrice: '19000000000',
      gasUsed: '35000',
      timestamp: '2024-01-15T14:32:10Z',
      status: 'confirmed',
      type: 'tax_payment'
    }
  ]);

  // Mock smart contracts data
  const [smartContracts] = useState<SmartContract[]>([
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      type: 'Property Assessment',
      count: 15678,
      color: 'blue',
      deployedAt: '2024-01-01T00:00:00Z',
      version: 'v2.1.0',
      status: 'active'
    },
    {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      type: 'Fraud Detection',
      count: 8945,
      color: 'red',
      deployedAt: '2024-01-01T00:00:00Z',
      version: 'v1.8.3',
      status: 'active'
    },
    {
      address: '0x567890abcdef1234567890abcdef1234567890ab',
      type: 'Financial Inclusion',
      count: 12334,
      color: 'green',
      deployedAt: '2024-01-01T00:00:00Z',
      version: 'v1.5.2',
      status: 'active'
    },
    {
      address: '0xcdef1234567890abcdef1234567890abcdef1234',
      type: 'Tax Collection',
      count: 8567,
      color: 'purple',
      deployedAt: '2024-01-01T00:00:00Z',
      version: 'v3.0.1',
      status: 'active'
    }
  ]);

  // Simulate real-time updates
  useInterval(() => {
    if (isLiveUpdates) {
      setNetworkStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + (Math.random() > 0.7 ? 1 : 0),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50),
        pendingTransactions: Math.max(0, prev.pendingTransactions + Math.floor(Math.random() * 20) - 10)
      }));
    }
  }, 5000);

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  }, []);

  const truncateHash = (hash: string, length: number = 16): string => {
    return `${hash.slice(0, length)}...${hash.slice(-8)}`;
  };

  const getTransactionTypeColor = (type: Transaction['type']): string => {
    const colors = {
      'property_update': 'bg-blue-100 text-blue-800',
      'fraud_report': 'bg-red-100 text-red-800',
      'tax_payment': 'bg-green-100 text-green-800',
      'contract_call': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: Transaction['status']): string => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const renderBlocks = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Layers className="h-5 w-5 mr-2 text-blue-500" />
        Latest Blocks
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Block #</th>
              <th className="text-left py-2">Hash</th>
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">Transactions</th>
              <th className="text-left py-2">Validator</th>
              <th className="text-left py-2">Size</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.number} className="border-b hover:bg-gray-50">
                <td className="py-3 font-mono text-blue-600 font-semibold">{block.number}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-600">{truncateHash(block.hash)}</span>
                    <button 
                      onClick={() => handleCopyToClipboard(block.hash)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3">{formatRelativeTime(block.timestamp)}</td>
                <td className="py-3 text-center font-semibold">{block.transactions}</td>
                <td className="py-3">{block.validator}</td>
                <td className="py-3">{block.size}</td>
                <td className="py-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Link className="h-5 w-5 mr-2 text-green-500" />
        Recent Transactions
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Transaction Hash</th>
              <th className="text-left py-2">Block</th>
              <th className="text-left py-2">From</th>
              <th className="text-left py-2">To</th>
              <th className="text-left py-2">Value (ETH)</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-600">{truncateHash(tx.hash)}</span>
                    <button 
                      onClick={() => handleCopyToClipboard(tx.hash)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 font-mono text-blue-600">{tx.blockNumber}</td>
                <td className="py-3 font-mono text-gray-600">{truncateHash(tx.from, 12)}</td>
                <td className="py-3 font-mono text-gray-600">{truncateHash(tx.to, 12)}</td>
                <td className="py-3 font-semibold">{(parseInt(tx.value) / 1e18).toFixed(4)}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getTransactionTypeColor(tx.type)}`}>
                    {tx.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSmartContracts = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-purple-500" />
          Smart Contract Activity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smartContracts.map((contract, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 bg-${contract.color}-500 rounded`}></div>
                <div>
                  <p className="font-semibold">{contract.type}</p>
                  <p className="text-xs text-gray-600 font-mono">{truncateHash(contract.address)}</p>
                  <p className="text-xs text-gray-500">v{contract.version}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-700">{contract.count.toLocaleString()}</p>
                <p className="text-xs text-gray-500">calls</p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {contract.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Contract Deployment Timeline</h3>
        <div className="space-y-3">
          {smartContracts.map((contract, index) => (
            <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className={`w-3 h-3 bg-${contract.color}-500 rounded-full`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{contract.type}</span>
                  <span className="text-sm text-gray-500">
                    {formatRelativeTime(contract.deployedAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-mono text-gray-600">{contract.address}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopyToClipboard(contract.address)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNetworkStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Blocks</p>
              <p className="text-2xl font-bold">{networkStats.totalBlocks.toLocaleString()}</p>
            </div>
            <Layers className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-sm text-green-600">+1,247 today</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Transactions</p>
              <p className="text-2xl font-bold">{(networkStats.totalTransactions / 1000000).toFixed(1)}M</p>
            </div>
            <Link className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-blue-600">1,234 TPS avg</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Smart Contracts</p>
              <p className="text-2xl font-bold">{smartContracts.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-sm text-purple-600">All active</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Validator Nodes</p>
              <p className="text-2xl font-bold">{networkStats.activeValidators}</p>
            </div>
            <Globe className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-sm text-green-600">99.9% uptime</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Network Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Block Time</span>
                <span className="font-semibold">{networkStats.averageBlockTime}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Network Hash Rate</span>
                <span className="font-semibold">{networkStats.networkHashRate}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pending Transactions</span>
                <span className="font-semibold">{networkStats.pendingTransactions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Validator Nodes</h3>
          <div className="space-y-3">
            {['BI-Node-01', 'OJK-Node-03', 'BPS-Node-02', 'PEMDA-Node-JKT', 'BKN-Node-01'].map((node, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">{node}</span>
                  <p className="text-xs text-gray-600">Validator #{index + 1}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Active</span>
                  <span className="text-xs font-semibold">99.{97 + index}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'blocks':
        return renderBlocks();
      case 'transactions':
        return renderTransactions();
      case 'contracts':
        return renderSmartContracts();
      case 'network':
        return renderNetworkStats();
      default:
        return renderBlocks();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blockchain Explorer</h2>
          <p className="text-gray-600">Explore blocks, transactions, and smart contracts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isLiveUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">
              {isLiveUpdates ? 'Live Updates' : 'Updates Paused'}
            </span>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isLiveUpdates}
              onChange={toggleLiveUpdates}
              className="rounded"
            />
            <span className="text-sm">Auto-refresh</span>
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by block number, transaction hash, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'blocks', label: 'Blocks', icon: Layers },
              { id: 'transactions', label: 'Transactions', icon: Link },
              { id: 'contracts', label: 'Smart Contracts', icon: FileText },
              { id: 'network', label: 'Network Stats', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};