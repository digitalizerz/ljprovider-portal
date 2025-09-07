import BaseAPI from './api';
import type {
  GlobalSettings,
  ApiResponse
} from '../types/api';

export class SettingsAPI extends BaseAPI {
  // Global Settings
  static async fetchGlobalSettings(token?: string): Promise<ApiResponse<GlobalSettings[]>> {
    return this.post('/fetchGlobalSettings', {}, token);
  }

  // File Upload
  static async uploadFileGivePath(data: {
    file: File;
    folder?: string;
  }, token: string): Promise<ApiResponse<{ file_path: string; file_url: string }>> {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.folder) {
      formData.append('folder', data.folder);
    }

    return this.request('/uploadFileGivePath', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Custom-Header': 'lovejoy-health-portal',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    }, token);
  }

  // Push Notifications
  static async pushNotificationToSingleUser(data: {
    user_id?: number;
    doctor_id?: number;
    title: string;
    message: string;
    type?: string;
    data?: any;
  }, token: string): Promise<ApiResponse<any>> {
    return this.post('/pushNotificationToSingleUser', data, token);
  }

  // Agora Token Generation (for video calls)
  static async generateAgoraToken(data: {
    channel_name: string;
    user_id: number;
    role?: 'publisher' | 'subscriber';
  }, token: string): Promise<ApiResponse<{ token: string; channel: string }>> {
    return this.post('/generateAgoraToken', data, token);
  }

  // Cache Management
  static async clearCache(): Promise<ApiResponse<{ message: string }>> {
    return this.post('/clear-cache', {});
  }
}