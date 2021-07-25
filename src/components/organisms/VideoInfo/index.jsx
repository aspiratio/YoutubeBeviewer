import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "styled-components";
import FavoriteButton from "../../molecules/FavoriteButton";
import Typography from "~/components/atoms/Typography";
import PaperButton from "~/components/atoms/PaperButton";

const Root = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Title = styled(Typography)`
  margin: 4px 0 10px;
  flex-grow: 1;
`;

const StyledFavoriteButton = styled(FavoriteButton)`
  flex-shrink: 0;
`;

const Description = styled(Typography)`
  margin-top: 10px;
  height: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  ${({ showAllDescription }) => !showAllDescription && "-webkit-line-clamp: 3"};
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`;

export const VideoInfoPresenter = ({
  videoId,
  title,
  description,
  publishedAt,
  viewCount,
}) => {
  const [showAllDescription, setShowAllDescription] = useState(false);
  return (
    <Root>
      <TitleWrapper>
        <Title size="subtitle" bold>
          {title}
        </Title>
        <StyledFavoriteButton videoId={videoId} />
      </TitleWrapper>
      <Typography size="xs" color="gray">
        {viewCount}
        回視聴•
        {publishedAt}
      </Typography>
      <Description showAllDescription={showAllDescription}>
        {description}
      </Description>
      <PaperButton onClick={() => setShowAllDescription(!showAllDescription)}>
        {showAllDescription ? "一部を表示" : "もっと見る"}
      </PaperButton>
    </Root>
  );
};

VideoInfoPresenter.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// APIから取得したデータを表示に必要なデータに変換してpresenterに渡すようにしている
// コンテナー・コンポーネントがAPIのデータ構造の変換に責務を持つ
const VideoInfoContainer = ({
  item: {
    id: videoId,
    snippet: { publishedAt, title, description },
    statistics: { viewCount },
  },
  presenter,
}) => presenter({
  videoId,
  title,
  viewCount,
  publishedAt: dayjs(publishedAt).format("YYYY/MM/DD"),
  description,
});

VideoInfoContainer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    snippet: PropTypes.shape({
      publishedAt: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    statistics: PropTypes.shape({
      viewCount: PropTypes.string,
    }),
  }),
  presenter: PropTypes.func.isRequired,
};

export default (props) => (
  <VideoInfoContainer presenter={VideoInfoPresenter} {...props} />
);
