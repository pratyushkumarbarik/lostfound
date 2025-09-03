import React from 'react';
import { MapPin, Clock, User } from 'lucide-react';

const ItemCard = ({ item, showClaimButton = false, onClaim }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'Available'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {item.status}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Found on {formatDate(item.createdAt)}</span>
          </div>
        </div>

        {item.status === 'Claimed' && item.claimedBy && (
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <div className="flex items-center text-sm text-blue-800 mb-1">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">Claimed by:</span>
            </div>
            <div className="text-sm text-blue-700">
              <p>{item.claimedBy.studentName}</p>
              <p>Roll No: {item.claimedBy.rollNumber}</p>
            </div>
          </div>
        )}

        {showClaimButton && item.status === 'Available' && onClaim && (
          <button
            onClick={() => onClaim(item)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Mark as Claimed
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
