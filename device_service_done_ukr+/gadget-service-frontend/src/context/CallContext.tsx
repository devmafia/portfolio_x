import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';

interface CallRequest {
  _id: string;
  name: string;
  phone: string;
}

interface CallContextType {
  callRequests: CallRequest[];
  fetchCalls: (token: string) => {};
  addCallRequest: (request: CallRequest) => void;
  updateCallRequest: (_id: string, updatedData: Omit<CallRequest, '_id'>) => void;
  removeCallRequest: (_id: string) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);

  const fetchCalls = useCallback(async (token: string) => {
  
    try {
    // Fetch Call Requests
    const callResponse = await axios.get('http://localhost:5000/api/call-requests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Call Requests Response:', callResponse.data);
      
      // Update state only once when data is fetched
    setCallRequests(callResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [])

  // Add a call request (assuming 'id' is handled by the backend)
  const addCallRequest = (request: CallRequest) => {
    //console.log(request)
    setCallRequests((prevRequests) => [...prevRequests, request]);
  };

  // Update a call request by id
  const updateCallRequest = (_id: string, updatedData: Omit<CallRequest, '_id'>) => {
    setCallRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === _id ? { ...request, ...updatedData } : request
      )
    );
  };

  // Remove a call request by id
  const removeCallRequest = (_id: string) => {
    setCallRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
  };

  return (
    <CallContext.Provider value={{ callRequests, fetchCalls, addCallRequest, updateCallRequest, removeCallRequest }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = (): CallContextType => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
