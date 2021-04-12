import React from 'react';
import { BeatLoader } from 'react-spinners';
import { usePromiseTracker } from 'react-promise-tracker';

export const LoadingIndicator: React.FC<{ scope: string }> = (props) => {
	const { promiseInProgress } = usePromiseTracker({ area: props.scope });
	return (
		<>
			<BeatLoader size={20} loading={promiseInProgress} color='#0DBBBB' show />
			{!promiseInProgress && props.children}
		</>
	);
};
