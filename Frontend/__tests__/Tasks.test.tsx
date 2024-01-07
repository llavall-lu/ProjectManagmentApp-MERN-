import { useGlobalState } from '@/app/context/GlobalContextProvider'
import TaskObject from  '@/app/Components/TaskObject/TaskObject';
import CreateTask from '@/app/Components/modal/CreateTask';
import Modal from '@/app/Components/modal/Modal';

jest.mock('@/app/context/GlobalContextProvider', () => ({
  useGlobalState: () => ({
    theme: { colorBg2: '#fff', borderColor2: '#000', purple: '#800080', colorGrey5: '#d3d3d3', colorGrey2: '#808080' },
    isLoading: false,
    openModal: jest.fn(),
    modal: false,
  }),
}));

jest.mock('../TaskObject/TaskObject', () => () => <div>Mocked TaskObject</div>);

jest.mock('../modal/CreateTask', () => () => <div>Mocked CreateTask</div>);

jest.mock('../modal/Modal', () => () => <div>Mocked Modal</div>);