
import api from './api';

export interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'leave';
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceStats {
  totalEmployees: number;
  todayPresent: number;
  todayAbsent: number;
  monthlyStats: {
    present: number;
    absent: number;
    leave: number;
  };
}

export const attendanceApi = {
  // Get today's attendance
  getTodayAttendance: async (): Promise<AttendanceRecord[]> => {
    const response = await api.get('/attendance/today');
    return response.data.data;
  },

  // Get monthly attendance for a specific employee
  getMonthlyAttendance: async (employeeId: string, date?: Date): Promise<AttendanceRecord[]> => {
    const params = date ? `?date=${date.toISOString()}` : '';
    const response = await api.get(`/attendance/${employeeId}${params}`);
    return response.data.data;
  },

  // Check in
  checkIn: async (employeeId: string): Promise<AttendanceRecord> => {
    const response = await api.post('/attendance/check-in', { employeeId });
    return response.data.data;
  },

  // Check out
  checkOut: async (employeeId: string): Promise<AttendanceRecord> => {
    const response = await api.post('/attendance/check-out', { employeeId });
    return response.data.data;
  },

  // Get attendance stats
  getAttendanceStats: async (date?: Date): Promise<AttendanceStats> => {
    const params = date ? `?date=${date.toISOString()}` : '';
    const response = await api.get(`/attendance/stats${params}`);
    return response.data.data;
  }
};
