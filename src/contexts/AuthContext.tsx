import { ReactNode, createContext, useEffect, useReducer } from "react";
import axios from "@/api";
import { setSession } from "@/lib/jwt";

interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  isInitialized: boolean;
  user: User | null;
}

type AuthAction =
  | {
      type: "INITIALIZE";
      payload: {
        isAuthenticated: boolean;
        isVerified: boolean;
        user: User | null;
      };
    }
  | {
      type: "LOGIN";
      payload: { isAuthenticated: boolean; isVerified: boolean; user: User };
    }
  | {
      type: "LOGOUT";
      payload: { isAuthenticated: boolean; isVerified: boolean; user: null };
    }
  | {
      type: "REGISTER";
      payload: { isAuthenticated: boolean; isVerified: boolean; user: User };
    };

const initialState: AuthState = {
  isAuthenticated: false,
  isVerified: false,
  isInitialized: false,
  user: null
};

const handlers: Record<
  string,
  (state: AuthState, action: AuthAction) => AuthState
> = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, isVerified, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isVerified,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { isAuthenticated, isVerified, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isVerified,
      user
    };
  },
  LOGOUT: (state, action) => {
    const { isAuthenticated, isVerified, user } = action.payload;

    return { ...state, isAuthenticated, isVerified, user };
  },
  REGISTER: (state, action) => {
    const { isAuthenticated, isVerified, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isVerified,
      user
    };
  }
};

const reducer = (state: AuthState, action: AuthAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
          setSession(accessToken);

          const { data } = await axios.get<
            ApiResponse<{ message: string; user: User }>
          >("/users/me");
          const { user } = data.payload;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              isVerified: user.isVerified,
              user
            }
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              isVerified: false,
              user: null
            }
          });
        }
      } catch (err: unknown) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            isVerified: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload: LoginPayload) => {
    console.log({ payload });

    const { data } = await axios.post<
      ApiResponse<{ message: string; token: string; user: User }>
    >("users/login", payload);

    const { token, user } = data.payload;

    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        isAuthenticated: true,
        isVerified: user?.isVerified
      }
    });
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await axios.post<
      ApiResponse<{ message: string; token: string; user: User }>
    >("users/organization-admin", payload);

    const { token, user } = data.payload;

    setSession(token);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
        isAuthenticated: true,
        isVerified: user?.isVerified
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
      payload: {
        user: null,
        isAuthenticated: false,
        isVerified: false
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
