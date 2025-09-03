import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const itemsAPI = {
  getAllItems: () => api.get('/items'),
  getAdminItems: () => api.get('/admin/items'),
  addItem: (itemData) => api.post('/admin/add-item', itemData),
  claimItem: (id, claimData) => api.put(`/admin/items/${id}/claim`, claimData),
  reportItem: (itemData) => api.post('/report-item', itemData),
  getReportedItems: () => api.get('/admin/reported-items'),
  approveReportedItem: (id) => api.post(`/admin/approve-reported-item/${id}`),
};

export const mockData = {
  items: [
    {
      id: '1',
      name: 'Blue Backpack',
      description: 'Found near the library, contains textbooks and notebooks',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Main Library',
      status: 'Available',
      createdAt: '2025-01-09T10:00:00Z'
    },
    {
      id: '2',
      name: 'Silver Watch',
      description: 'Casio digital watch found in the cafeteria',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Student Cafeteria',
      status: 'Available',
      createdAt: '2025-01-08T14:30:00Z'
    },
    {
      id: '3',
      name: 'Red Notebook',
      description: 'Mathematics notebook with handwritten notes',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Classroom 101',
      status: 'Claimed',
      claimedBy: {
        studentName: 'John Doe',
        rollNumber: 'CS2021001',
        idCardImage: 'mock-id-card.jpg'
      },
      createdAt: '2025-01-07T09:15:00Z'
    }
  ],
  reportedItems: [
    {
      id: 'r1',
      studentName: 'Jane Smith',
      branch: 'Computer Science',
      rollNumber: 'CS2021002',
      itemName: 'Black Phone',
      description: 'iPhone 12 found near parking lot',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'Pending',
      createdAt: '2025-01-09T16:45:00Z'
    }
  ]
};
