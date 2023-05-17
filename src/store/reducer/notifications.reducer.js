import {
  NOTIFICATIONS_ENQUEUE_SNACKBAR,
  NOTIFICATIONS_CLOSE_SNACKBAR,
  NOTIFICATIONS_REMOVE_SNACKBAR,
  FETCH_ALL_NOTIFICATIONS_LIST,
  FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS,
  FETCH_ALL_NOTIFICATIONS_LIST_FAILURE,
} from "../action/actionType";

const defaultState = {
  notifications: [],

  fetchNotificationListLoading: false,
  fetchNotificationListError: "",
  notificationList: [],
  unReadNotificationsCount: 0,
  isShowViewMoreButton: true,

  markAllNotificationAsReadLoading: false,
};

const notification = (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case NOTIFICATIONS_CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification },
        ),
      };
    case NOTIFICATIONS_REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    case FETCH_ALL_NOTIFICATIONS_LIST:
      return {
        ...state,
        fetchNotificationListLoading: true,
        isShowViewMoreButton: false,
        fetchNotificationListError: "",
      };
    case FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS:
      return {
        ...state,
        fetchNotificationListLoading: false,
        notificationList:
          action.payload.pageCount > 1
            ? [...state.notificationList, ...action.payload.notifications]
            : action.payload.notifications,
        unReadNotificationsCount: action.payload.unReadCount,
        isShowViewMoreButton:
          action.payload.notifications.length < 5 ? false : true,
      };
    case FETCH_ALL_NOTIFICATIONS_LIST_FAILURE:
      return {
        ...state,
        fetchNotificationListLoading: false,
        fetchNotificationListError: action.payload.error,
      };

    default:
      return state;
  }
};

export default notification;
