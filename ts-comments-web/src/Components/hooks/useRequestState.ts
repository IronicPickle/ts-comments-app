import { useState } from "react";

export enum ReqStates {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

interface ReqIdle {
  status: ReqStates.IDLE;
}

interface ReqLoading {
  status: ReqStates.LOADING;
}

interface ReqSuccess<D> {
  status: ReqStates.SUCCESS;
  data: D;
}

interface ReqError {
  status: ReqStates.ERROR;
  error: string;
}

type ReqState<D> = ReqIdle | ReqLoading | ReqSuccess<D> | ReqError;

const useRequestState = <D>() => {
  const [reqState, setReqState] = useState<ReqState<D>>({
    status: ReqStates.IDLE,
  });

  const setIdle = () => {
    setReqState({ status: ReqStates.IDLE });
  };
  const setLoading = () => {
    setReqState({ status: ReqStates.LOADING });
  };
  const setSuccess = (data: D) => {
    setReqState({ status: ReqStates.SUCCESS, data });
  };
  const setError = (error?: string | null) => {
    setReqState({
      status: ReqStates.ERROR,
      error: error ?? "Something went wrong",
    });
  };

  return { reqState, setIdle, setLoading, setSuccess, setError };
};

export default useRequestState;
