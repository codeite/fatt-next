export interface FattSettings {
  tasks?: Record<
    string,
    {
      id: string;
      short: string;
      iconName: string;
    }
  >;
}
