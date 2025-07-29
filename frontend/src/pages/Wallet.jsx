import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCoins, FaHistory, FaCreditCard, FaGift, FaArrowUp, FaArrowDown, FaPlus, FaTint, FaUser } from 'react-icons/fa';

const Wallet = () => {
  const { backendUrl, token, user } = useContext(AppContext);
  const [coins, setCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);

  useEffect(() => {
    if (token) {
      fetchWalletData();
    }
  }, [token]);

  const fetchWalletData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/coins`, {
        headers: { token }
      });
      if (response.data.success) {
        setCoins(response.data.coins);
        setTransactions(response.data.recentTransactions);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  const handleAddCoins = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update coins (in real app, this would be handled by payment gateway)
      const newCoins = coins + selectedAmount;
      setCoins(newCoins);
      
      toast.success(`${selectedAmount} coins added to your wallet!`);
      setShowAddCoins(false);
      fetchWalletData();
    } catch (error) {
      toast.error('Failed to add coins');
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'earned':
        return <FaArrowDown className="text-green-500" />;
      case 'spent':
        return <FaArrowUp className="text-red-500" />;
      case 'bonus':
        return <FaGift className="text-purple-500" />;
      default:
        return <FaCoins className="text-yellow-500" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'earned':
        return 'text-green-600 bg-green-100';
      case 'spent':
        return 'text-red-600 bg-red-100';
      case 'bonus':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const coinPackages = [
    { amount: 100, price: 10, bonus: 0 },
    { amount: 250, price: 20, bonus: 25 },
    { amount: 500, price: 35, bonus: 75 },
    { amount: 1000, price: 60, bonus: 200 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCoins className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            My Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Manage your coins and view transaction history
          </p>
        </div>

        {/* Coins Balance Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 animate-fade-in-up">
          <div className="text-center">
            <div className="coins-display inline-flex items-center space-x-2 text-2xl mb-4">
              <FaCoins />
              <span>{coins}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Coins</h2>
            <p className="text-gray-600 mb-6">
              Use coins to book appointments and unlock premium features
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowAddCoins(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Coins</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <FaGift />
                <span>Redeem Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Coins Modal */}
        {showAddCoins && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add Coins to Wallet
              </h3>
              
              <div className="space-y-4 mb-6">
                {coinPackages.map((pkg) => (
                  <div
                    key={pkg.amount}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAmount === pkg.amount
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => setSelectedAmount(pkg.amount)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <FaCoins className="text-yellow-500" />
                          <span className="font-bold text-lg">{pkg.amount} Coins</span>
                          {pkg.bonus > 0 && (
                            <span className="text-green-600 text-sm font-semibold">
                              +{pkg.bonus} Bonus
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          ${pkg.price} USD
                        </p>
                      </div>
                      {selectedAmount === pkg.amount && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAddCoins(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCoins}
                  disabled={isLoading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Purchase Coins'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <FaHistory />
              <span>Transaction History</span>
            </h2>
            <button className="text-primary hover:text-primary-dark font-semibold">
              View All
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <FaHistory className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-500">
                Your transaction history will appear here once you start using coins.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.paymentMethod)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {transaction.description}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {transaction.coinsEarned > 0 && (
                        <span className="text-green-600 font-semibold">
                          +{transaction.coinsEarned}
                        </span>
                      )}
                      {transaction.coinsUsed > 0 && (
                        <span className="text-red-600 font-semibold">
                          -{transaction.coinsUsed}
                        </span>
                      )}
                      <FaCoins className="text-yellow-500" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getTransactionColor(transaction.paymentMethod)}`}>
                      {transaction.paymentMethod}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Earn Coins */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            How to Earn Coins
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGift className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Book Appointments</h3>
              <p className="text-gray-600 text-sm">
                Earn 50 coins for every appointment you book
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTint className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Blood Donation</h3>
              <p className="text-gray-600 text-sm">
                Earn 100 coins for successful blood donation
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-purple-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Refer Friends</h3>
              <p className="text-gray-600 text-sm">
                Earn 25 coins for each friend who joins
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;