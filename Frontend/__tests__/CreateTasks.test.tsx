import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import CreateTask from '../app/Components/modal/CreateTask';
import { GlobalProvider } from '../app/context/GlobalContextProvider';
import axios from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  useUser: () => ({ user: { name: 'Test User' } }), // Mocked useUser function
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/current-route',
    pathname: '/current-route',
    query: {},
    asPath: '',
    push: jest.fn(),
  }),
}));

describe('CreateTaskModal', () => {
    test('renders description label', async () => { 
      // Mock the Axios get request
      mockedAxios.get.mockResolvedValueOnce({ data: [
        {
            "_id": "clr12x4vs00066s1ne0laff4s",
            "title": "Lorem",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in pellentesque massa placerat duis ultricies.",
            "date": {
              "$date": "2024-02-01T00:05:04Z"
            },
            "isCompleted": false,
            "isImportant": false,
            "created_at": {
              "$date": "2024-01-05T20:19:00.472Z"
            },
            "updated_at": {
              "$date": "2024-01-06T22:09:04.895Z"
            },
            "userId": "user_2aSQ9D3RD50pABWZB3BWLUx1Td9"
            },
      ] });
      
      // Render the component
      const { rerender } = render(
        <GlobalProvider>
          <CreateTask />
        </GlobalProvider>
      );
      
      
      await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(4));
      
      (useRouter().push as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));
      rerender(
        <GlobalProvider>
          <CreateTask />
        </GlobalProvider>
      );
      
      
      const descriptionLabel = await waitFor(() => screen.getByLabelText('Description'));
      expect(descriptionLabel).toBeInTheDocument();
    });
  });

  test('shows an error when the title is less than 3 characters long', async () => {
    render(
      <GlobalProvider>
        <CreateTask />
      </GlobalProvider>
    );

    fireEvent.submit(screen.getByTestId('create-task-form'), {
      target: {
        title: { value: 'a' },
        description: { value: 'Test description' },
        date: { value: '2025-12-31' },
        time: { value: '23:59' },
      },
    });

    await waitFor(() => expect(screen.getByText('Title must be at least 3 characters long')).toBeInTheDocument());
  });
 