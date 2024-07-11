
export const envHelper = (redirectPath: string) => {
  const baseUrl =
    process.env.ENV === 'dev' ? 'http://localhost:5173' : 'https://blui-6ec33.web.app';
  return `${baseUrl}/${redirectPath}`;
};
