/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiPageContentBody, EuiTitle } from '@elastic/eui';
import React from 'react';

import { InfraMetricData } from '../../../common/graphql/types';
import { InfraMetricLayout, InfraMetricLayoutSection } from '../../pages/metrics/layouts/types';
import { InfraLoadingPanel } from '../loading';
import { Section } from './section';

interface Props {
  metrics: InfraMetricData[];
  layout: InfraMetricLayout[];
  loading: boolean;
  nodeName: string;
}

export class Metrics extends React.PureComponent<Props> {
  public render() {
    if (this.props.loading) {
      return (
        <InfraLoadingPanel
          height="100vh"
          width="auto"
          text={`Loading data for ${this.props.nodeName}`}
        />
      );
    }
    return <React.Fragment>{this.props.layout.map(this.renderLayout)}</React.Fragment>;
  }

  private renderLayout = (layout: InfraMetricLayout) => {
    return (
      <React.Fragment key={layout.id}>
        <EuiPageContentBody>
          <EuiTitle size="m">
            <h2 id={layout.id}>{`${layout.label} Overview`}</h2>
          </EuiTitle>
        </EuiPageContentBody>
        {layout.sections.map(this.renderSection(layout))}
      </React.Fragment>
    );
  };

  private renderSection = (layout: InfraMetricLayout) => (section: InfraMetricLayoutSection) => {
    return (
      <Section section={section} metrics={this.props.metrics} key={`${layout.id}-${section.id}`} />
    );
  };
}