import React from 'react'
import { KeyContainer, BulletPoint } from './styles';
const Key = () => {
    return (
        <KeyContainer>
            <BulletPoint role='list'>
                Not Completed
            </BulletPoint>
            <BulletPoint role='list'>
                Completed
            </BulletPoint>
        </KeyContainer>
    )
}

export default Key