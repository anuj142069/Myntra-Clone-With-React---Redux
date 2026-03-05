import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice.js";
import { fetchStatusActions } from "../store/fetchStatusSlice.js";

const FetchItems = () => {

  const fetchStatus = useSelector(store => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if(fetchStatus.fetchDone) return;
    const controller = new AbortController();
    const signal = controller.signal;
    // dispatch(fetchStatusActions.markFetchingStarted());
    fetch("https://myntra-clone-with-react-redux-and-node.onrender.com", {signal})
    .then((res) => res.json())
    .then(({items}) => {
      // dispatch(fetchStatusActions.markFetchDone());
      // dispatch(fetchStatusActions.markFetchingFinished());
      dispatch(itemsActions.addInitialItems(items[0]));
      
    });

    return () => {
      controller.abort();
    };
  }, [fetchStatus])

  return(
    <>
    </>
  )

}
export default FetchItems;
